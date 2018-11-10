defmodule TaskManagerSpa.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :description, :string
    field :minutes_worked, :integer
    field :title, :string
    field :completed, :boolean
    belongs_to :user, TaskManagerSpa.Users.User, foreign_key: :assignee_id

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :description, :minutes_worked, :completed, :assignee_id])
    |> unique_constraint(:title)
    |> validate_required([:title])
  end
end
