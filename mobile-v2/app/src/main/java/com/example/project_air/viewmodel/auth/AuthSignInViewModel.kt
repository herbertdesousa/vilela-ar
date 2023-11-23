package com.example.project_air.viewmodel.auth

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.project_air.model.repository.AuthRepository
import com.google.firebase.auth.FirebaseAuth
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

class SignUpEmailInUseException() : Exception()
class SignInInvalidCredentialsException() : Exception()

@HiltViewModel
class AuthSignInViewModel @Inject constructor(
  private val authRepository: AuthRepository,
) : ViewModel() {
  private var firebaseAuth: FirebaseAuth = FirebaseAuth.getInstance()

//  var currentUser by remember { mutableStateOf(firebaseAuth.currentUser) }
//  var errors by remember { mutableStateOf("") }

  fun onSignIn(email: String, password: String) {
    viewModelScope.launch {
      authRepository.signIn(email, password)
    }
  }

  fun onSignOut() {
    //firebaseAuth.signOut()
  }
}