import socket

def tcp_client():
    # Configurações do servidor
    host = '127.0.0.1'
    port = 3001

    # Criar socket TCP
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    
    try:
        # Conectar ao servidor
        client_socket.connect((host, port))
        print(f"Conectado ao servidor {host}:{port}")

        # Enviar mensagem
        message = "Olá, servidor!\r\n"
        client_socket.sendall(message.encode('utf-8'))
        print(f"Mensagem enviada: {message.strip()}")

        # Receber resposta
        while True:
            data = client_socket.recv(1024)
            if not data:
                break
            print(f"Mensagem recebida do servidor: {data.decode('utf-8')}")

    except ConnectionRefusedError:
        print("Erro: Não foi possível conectar ao servidor")
    except Exception as e:
        print(f"Erro inesperado: {e}")
    finally:
        # Fechar conexão
        client_socket.close()
        print("Conexão fechada")

if __name__ == "__main__":
    tcp_client()