defmodule TaskManagerSpa.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :string, null: false
      add :description, :text, default: "", null: false
      add :minutes_worked, :integer, default: 0, null: false
      add :completed, :boolean, default: false, null: false
      add :assignee_id, references(:users, on_delete: :nilify_all)

      timestamps()
    end

    create index(:tasks, [:title], unique: true)
    create index(:tasks, [:assignee_id])
  end
end
