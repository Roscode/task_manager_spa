# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TaskManagerSpa.Repo.insert!(%TaskManagerSpa.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias TaskManagerSpa.Repo
alias TaskManagerSpa.Users.User

pwhash = Argon2.hash_pwd_salt("passw0rd")

roscode = Repo.insert!(%User{username: "roscode", password_hash: pwhash})
Repo.insert!(%User{username: "anotheruser", password_hash: pwhash})

alias TaskManagerSpa.Tasks.Task

Repo.insert!(%Task{title: "Do your homework", description: "it's due tomorrow", assignee_id: roscode.id, completed: false })
Repo.insert!(%Task{title: "take a break", description: "you deserve it"})
Repo.insert!(%Task{title: "do something in the past", description: "is that even possible?", completed: true})
Repo.insert!(%Task{title: "blahblah", description: "weoifnwoef"})
