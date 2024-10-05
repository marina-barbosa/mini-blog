import { useState, useEffect, useReducer } from "react";
import db from "../firebase/config"
import { updateDoc, doc } from "firebase/firestore";

// Estado inicial para o reducer, contendo os campos 'loading' e 'error'
const initialState = {
  loading: null,
  error: null,
}

// Função reducer que gerencia o estado de atualização do documento com base nas ações despachadas
const updateReducer = (state, action) => {
  switch (action.type) {
    // Ação que indica que o processo de atualização está em andamento
    case "LOADING":
      return { loading: true, error: null };
    // Ação que indica que o documento foi inserido com sucesso
    case "UPDATED_DOC":
      return { loading: false, error: null };
    // Ação para quando ocorre um erro durante a atualização
    case "ERROR":
      return { loading: false, error: action.payload }; // 'payload' contém a mensagem de erro
    // Retorno padrão do estado caso a ação não seja reconhecida
    default:
      return state;
  }
}

// Hook personalizado para atualizar um documento em uma coleção do Firestore
export const useUpdateDocument = (docCollection) => {
  // Usa o 'useReducer' para gerenciar o estado baseado nas ações disparadas pelo reducer
  const [response, dispatch] = useReducer(updateReducer, initialState);

  // Estado para controlar se o componente foi desmontado (evitar vazamento de memória)
  const [cancelled, setCancelled] = useState(false);

  // Função auxiliar que verifica se o componente foi desmontado antes de despachar uma ação
  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action); // Despacha a ação apenas se o componente ainda estiver montado
    }
  }

  // Função assíncrona responsável por atualizar o documento no Firestore
  const updateDocument = async (id, data) => {
    // Despacha a ação de carregamento para indicar que o processo de atualização começou
    checkCancelBeforeDispatch({
      type: "LOADING"
    });
    try {
      // Obtém a referência ao documento a ser atualizado
      const docRef = await doc(db, docCollection, id)
      // Atualiza o documento com os dados fornecidos
      const updatedDocument = await updateDoc(docRef, data)

      // Despacha a ação indicando que o documento foi atualizado com sucesso
      checkCancelBeforeDispatch({
        type: "UPDATED_DOC",
        payload: updatedDocument // O documento atualizado com sucesso
      });
    } catch (error) {
      // Em caso de erro, despacha a ação de erro com a mensagem de erro
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message // A mensagem de erro
      });
    }
  }

  // Hook 'useEffect' usado para definir o estado 'cancelled' como verdadeiro quando o componente é desmontado
  useEffect(() => {
    return () => setCancelled(true); // Evita vazamento de memória ao desmontar o componente
  }, []);

  // Retorna a função 'updateDocument' e o estado 'response' com o status da atualização
  return { updateDocument, response };
}
