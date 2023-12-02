package com.example.project_air.data.repository

import io.reactivex.rxjava3.core.Observable
import com.example.project_air.data.model.User
import com.example.project_air.data.repository.util.UserState
import com.example.project_air.data.util.Resource

interface AuthRepositoryInterface {
  //  fun signUp(onSuccess: (result: User) -> Unit, onFailure: (exception: Exception) -> Unit)

  // onSuccess: (result: User) -> Unit, onFailure: (errorMessage: String) -> Unit
  suspend fun signIn(email: String, password: String): Resource<User>

  val user: Observable<UserState>
  //  fun recoverPassword(onSuccess: () -> Unit, onFailure: (exception: Exception) -> Unit)
//  fun getUser(onSuccess: (result: User) -> Unit, onFailure: (exception: Exception) -> Unit)
  suspend fun logout(): Resource<Unit>
}