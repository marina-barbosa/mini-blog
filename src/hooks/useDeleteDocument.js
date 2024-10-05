import { useState, useEffect, useReducer } from "react";
import db from "../firebase/config"
import { doc, deleteDoc } from "firebase/firestore";

// Estado inicial para o reducer, contendo os campos 'loading' e 'error'
const initialState = {
  loading: null,
  error: null,
}

// Função reducer responsável por gerenciar o estado da exclusão do documento com base nas ações recebidas
const deleteReducer = (state, action) => {
  switch (action.type) {
    // Ação que sinaliza o início do processo de exclusão
    case "LOADING":
      return { loading: true, error: null };
    // Ação que indica sucesso na exclusão do documento
    case "DELETED_DOC":
      return { loading: false, error: null };
    // Ação que captura um erro ocorrido durante o processo de exclusão
    case "ERROR":
      return { loading: false, error: action.payload }; // O payload carrega a mensagem de erro
    // Retorno padrão caso a ação não seja reconhecida pelo reducer
    default:
      return state;
  }
}

// Hook personalizado para excluir um documento de uma coleção do Firestore
export const useDeleteDocument = (docCollection) => {
  // Hook 'useReducer' que utiliza o reducer para controlar o estado da exclusão
  const [response, dispatch] = useReducer(deleteReducer, initialState);

  // Estado que controla se o componente foi desmontado (evita possíveis vazamentos de memória)
  const [cancelled, setCancelled] = useState(false);

  // Função auxiliar que verifica se o componente foi desmontado antes de despachar uma ação
  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action); // Despacha a ação apenas se o componente ainda estiver montado
    }
  }

  // Função assíncrona responsável por excluir o documento do Firestore
  const deleteDocument = async (id) => {
    // Sinaliza o início do carregamento ao iniciar o processo de exclusão
    checkCancelBeforeDispatch({
      type: "LOADING"
    });
    try {
      // Exclui o documento usando o ID
      const deletedDocument = await deleteDoc(doc(db, docCollection, id))

      // Despacha a ação indicando que o documento foi excluído com sucesso
      checkCancelBeforeDispatch({
        type: "DELETED_DOC",
        payload: deletedDocument // O documento excluído com sucesso
      });
    } catch (error) {
      // Em caso de erro, despacha a ação de erro com a mensagem de erro
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message // A mensagem de erro
      });
    }
  }

  // O hook 'useEffect' é utilizado para definir o estado 'cancelled' como verdadeiro quando o componente é desmontado,
  // garantindo que não haja atualizações de estado após a desmontagem, evitando vazamentos de memória
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  // Retorna a função 'deleteDocument' para exclusão e o estado 'response' para monitorar o status da operação
  return { deleteDocument, response };
}
