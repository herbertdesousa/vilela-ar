package com.example.project_air.data.repository.util

import com.example.project_air.data.model.User

sealed class UserState(val user: User? = null) {
  class Success(user: User): UserState(user)

  class Loading(): UserState()

  class UnAuthed(): UserState()
}