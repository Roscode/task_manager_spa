use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :task_manager_spa, TaskManagerSpaWeb.Endpoint,
  http: [port: 4002],
  server: false

get_secret = fn name ->
  base = Path.expand("~/.config/task_manager_spa")
  File.mkdir_p!(base)
  path = Path.join(base, name)
  unless File.exists?(path) do
    secret = Base.encode16(:crypto.strong_rand_bytes(32))
    File.write!(path, secret)
  end
  String.trim(File.read!(path))
end


# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :task_manager_spa, TaskManagerSpa.Repo,
  username: "task_manager_dev",
  password: get_secret.("dev_db_pass"),
  database: "task_manager_spa_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
