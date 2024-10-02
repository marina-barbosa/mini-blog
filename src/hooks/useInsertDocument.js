import { useState, useEffect, useReducer } from "react";
import db from "../firebase/config"
import { collection, addDoc, Timestamp } from "firebase/firestore";

// Estado inicial para o reducer, contendo os campos 'loading' e 'error'
const initialState = {
  loading: null,
  error: null,
}

// Função reducer que gerencia o estado de inserção do documento com base nas ações despachadas
const insertReducer = (state, action) => {
  switch (action.type) {
    // Ação que indica que o processo de inserção está em andamento
    case "LOADING":
      return { loading: true, error: null };
    // Ação que indica que o documento foi inserido com sucesso
    case "INSERTED_DOC":
      return { loading: false, error: null };
    // Ação para quando ocorre um erro durante a inserção
    case "ERROR":
      return { loading: false, error: action.payload }; // 'payload' contém a mensagem de erro
    // Retorno padrão do estado caso a ação não seja reconhecida
    default:
      return state;
  }
}

// Hook personalizado para inserir um documento em uma coleção do Firestore
export const useInsertDocument = (docCollection) => {
  // Usa o 'useReducer' para gerenciar o estado baseado nas ações disparadas pelo reducer
  const [response, dispatch] = useReducer(insertReducer, initialState);

  // Estado para controlar se o componente foi desmontado (evitar vazamento de memória)
  const [cancelled, setCancelled] = useState(false);

  // Função auxiliar que verifica se o componente foi desmontado antes de despachar uma ação
  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action); // Despacha a ação apenas se o componente ainda estiver montado
    }
  }

  // Função assíncrona responsável por inserir o documento no Firestore
  const insertDocument = async (document) => {
    // Despacha a ação de carregamento para indicar que o processo de inserção começou
    checkCancelBeforeDispatch({
      type: "LOADING"
    });
    try {
      // Cria um novo documento adicionando o campo 'createdAt' com a timestamp atual
      const newDocument = { ...document, createdAt: Timestamp.now() };
      // Insere o novo documento na coleção específica do Firestore
      const insertedDocument = await addDoc(
        collection(db, docCollection), // Refere-se à coleção no Firestore
        newDocument // O documento que será inserido
      );
      // Despacha a ação indicando que o documento foi inserido com sucesso
      checkCancelBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertedDocument // O documento inserido com sucesso
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

  // Retorna a função 'insertDocument' e o estado 'response' com o status da inserção
  return { insertDocument, response };
}
