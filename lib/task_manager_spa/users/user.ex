defmodule TaskManagerSpa.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :password_hash, :string
    field :username, :string
    field :admin, :boolean
    has_many :tasks, TaskManagerSpa.Tasks.Task, foreign_key: :assignee_id

    field :password, :string, virtual: true

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :password, :admin])
    |> unique_constraint(:username)
    |> hash_password()
    |> validate_required([:username, :password_hash])
  end

  def hash_password(%Ecto.Changeset{valid?: true, changes: %{password: password}} = changeset) do
    change(changeset, Comeonin.Argon2.add_hash(password))
  end

  def hash_password(changeset), do: changeset
end
