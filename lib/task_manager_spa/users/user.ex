defmodule TaskManagerSpa.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :password_hash, :string
    field :username, :string
    has_many :tasks, TaskManagerSpa.Tasks.Task, foreign_key: :assignee_id

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :password_hash])
    |> unique_constraint(:username)
    |> validate_required([:username, :password_hash])
  end
end
