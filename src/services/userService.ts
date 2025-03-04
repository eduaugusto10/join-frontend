import { API_ENDPOINTS } from "../config/api";
import api from "./api";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

export interface UpdateUserData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

export const userService = {
  async getUsers(): Promise<User[]> {
    try {
      const response = await api.get(API_ENDPOINTS.users);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao carregar usuários");
    }
  },

  async getUser(id: string): Promise<User> {
    try {
      const response = await api.get(API_ENDPOINTS.user(id));
      const data = response.data;

      if (!data) {
        throw new Error("Nenhum dado recebido da API");
      }

      const userData = Array.isArray(data) ? data[0] : data;

      const user: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        cpf: userData.cpf,
      };

      return user;
    } catch (error) {
      throw error;
    }
  },

  async createUser(userData: CreateUserData): Promise<User> {
    try {
      const response = await api.post(API_ENDPOINTS.users, userData);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao criar usuário");
    }
  },

  async updateUser(id: string, userData: UpdateUserData): Promise<User> {
    try {
      console.log("userService - Enviando dados para atualização:", userData);

      const dataToSend = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        cpf: userData.cpf,
      };

      console.log("userService - Dados formatados para envio:", dataToSend);
      const response = await api.put(API_ENDPOINTS.put(id), dataToSend);
      console.log("userService - Resposta da atualização:", response.data);
      return response.data;
    } catch (error) {
      console.error("userService - Erro na atualização:", error);
      throw new Error("Erro ao atualizar usuário");
    }
  },

  async deleteUser(id: string): Promise<void> {
    try {
      await api.delete(API_ENDPOINTS.delete(id));
    } catch (error) {
      throw new Error("Erro ao excluir usuário");
    }
  },
};
