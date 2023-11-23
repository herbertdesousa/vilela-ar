package com.example.project_air.view.auth

import androidx.compose.foundation.layout.Column
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavHostController
import com.example.project_air.viewmodel.auth.AuthSignInViewModel

@Composable
fun AuthSignInScreen(
  navController: NavController,
  viewModel: AuthSignInViewModel = hiltViewModel()
) {
  Column {
    Button(onClick = { viewModel.onSignIn("hbt@email.com", "123456") }) {
      Text(text = "asdadas")
    }

    /*if (currentUser != null) {
      Text(text = "UID: ${currentUser!!.uid}")
      Text(text = "email: ${currentUser!!.email}")
      Button(onClick = {
        signOut()
        currentUser = null
      }) {
        Text(text = "Sign Out")
      }
    }

    if (currentUser == null) {
      Button(onClick = {

        lifecycleScope.launch {
          try {
            errors = ""

            val user = signUp("hbt@email.com", "123456")

            if (user !== null) currentUser = user
          } catch (e: SignUpEmailInUseException) {
            errors = "Email already in use"
          }
        }
      }) {
        Text(text = "sign up")
      }

      Button(onClick = {
        lifecycleScope.launch {
          try {
            errors = ""

            val (email, password) = when ((0..1).random()) {
              1 -> listOf("hbt@email.com", "123456")
              else -> listOf("wrong@email.com", "786545")
            }

            println("$email and $password")

            val user = signIn(email, password)

            if (user !== null) currentUser = user
          } catch (e: SignInInvalidCredentialsException) {
            errors = "Invalid Email/Password"
          }
        }
      }) {
        Text(text = "sign in")
      }

      Text(text = errors)
    }*/
  }
}