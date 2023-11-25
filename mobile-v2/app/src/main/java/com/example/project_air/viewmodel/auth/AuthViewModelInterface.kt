package com.example.project_air.viewmodel.auth

import com.example.project_air.model.User

interface AuthViewModelInterface {
  var email: String
  var password: String
//  val errors: String

//  fun signUp(onSuccess: (result: User) -> Unit, onFailure: (exception: Exception) -> Unit)
  fun signIn(onSuccess: (result: User) -> Unit, onFailure: (errorMessage: String) -> Unit)
  fun isUserLoggedIn(onSuccess: (isLoggedIn: Boolean) -> Unit)
//  fun recoverPassword(onSuccess: () -> Unit, onFailure: (exception: Exception) -> Unit)
//  fun getUser(onSuccess: (result: User) -> Unit, onFailure: (exception: Exception) -> Unit)
  fun logout(onSuccess: () -> Unit, onFailure: (e: Exception) -> Unit)
}