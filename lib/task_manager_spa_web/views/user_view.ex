defmodule TaskManagerSpaWeb.UserView do
  use TaskManagerSpaWeb, :view
  alias TaskManagerSpaWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      username: user.username,
      password_hash: user.password_hash,
      admin: user.admin,
    }
  end
end
