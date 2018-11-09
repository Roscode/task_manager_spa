#!/bin/bash

export PORT=4749

echo "Stopping old copy of app, if any..."

_build/prod/rel/task_manager_spa/bin/task_manager_spa stop || true

echo "Starting app..."

_build/prod/rel/task_manager_spa/bin/task_manager_spa foreground

