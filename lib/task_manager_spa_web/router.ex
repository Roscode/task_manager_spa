defmodule TaskManagerSpaWeb.Router do
  use TaskManagerSpaWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TaskManagerSpaWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/users", PageController, :index
    get "/tasks/", PageController, :index
    get "/tasks/:task_id", PageController, :index
    get "/task/new", PageController, :index
    get "/sessions", PageController, :index
  end

  scope "/api/v1", TaskManagerSpaWeb do
    pipe_through :api

    resources "/tasks", TaskController, except: [:new, :edit]
    resources "/users", UserController, except: [:new, :edit]
    resources "/sessions", SessionController, only: [:create]
  end
end
