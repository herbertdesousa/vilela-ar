package com.example.project_air.viewmodel.auth

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.project_air.model.User
import com.google.firebase.Firebase
import com.google.firebase.FirebaseException
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.auth
import kotlinx.coroutines.launch
import kotlinx.coroutines.tasks.await

class FirebaseAuthViewModel : ViewModel(), AuthViewModelInterface {
  private val firebaseAuth: FirebaseAuth = Firebase.auth

  private var _email by mutableStateOf("hbt@email.com")
  override var email: String
    get() = _email
    set(value) {
      _email = value
    }

  private var _password by mutableStateOf("123456")
  override var password: String
    get() = _password
    set(value) {
      _password = value
    }

  override fun signIn(
    onSuccess: (result: User) -> Unit,
    onFailure: (errorMessage: String) -> Unit
  ) {
    viewModelScope.launch {
      try {
        val result = firebaseAuth.signInWithEmailAndPassword(email, password).await()

        onSuccess(User(result.user!!.uid))
      } catch (e: FirebaseException) {
        onFailure("Email/Senha Incorretos")
      } catch (e: Exception) {
        onFailure("Erro ao Logar, Tente Novamente")
      }
    }
  }

  override fun isUserLoggedIn(
    onSuccess: (isLoggedIn: Boolean) -> Unit,
  ) {
    val currentUser = firebaseAuth.currentUser
    onSuccess(currentUser != null)
  }

  override fun logout(onSuccess: () -> Unit, onFailure: (e: Exception) -> Unit) {
    try {
      firebaseAuth.signOut()

      onSuccess()
    } catch (e: Exception) {
      onFailure(e)
    }
  }
}