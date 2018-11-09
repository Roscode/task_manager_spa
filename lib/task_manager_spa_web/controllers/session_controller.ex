defmodule TaskManagerSpaWeb.SessionController do
  use TaskManagerSpaWeb, :controller

  alias TaskManagerSpa.Users
  alias Users.User

  def create(conn, %{"username" => username, "password" => password}) do
    with %User{} = user <- Users.get_and_auth_user(username, password) do
      resp = %{
        data: %{
          token: Phoenix.Token.sign(TaskManagerSpaWeb.Endpoint, "user_id", user.id),
          user_id: user.id,
        }
      }
      conn
      |> put_resp_header("content-type", "application/json; charset=utf-8")
      |> send_resp(:created, Jason.encode!(resp))
    else
      _err ->
        conn
        |> send_resp(:unauthorized, Jason.encode!(%{error: "unathorized"}))
    end
  end
end

