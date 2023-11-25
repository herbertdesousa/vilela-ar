package com.example.project_air.view.auth

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import androidx.hilt.navigation.compose.hiltViewModel
import com.example.project_air.R
import com.example.project_air.view.util.Route
import com.example.project_air.viewmodel.auth.AuthViewModelInterface
import com.example.project_air.viewmodel.auth.FirebaseAuthViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AuthSignInScreen(
  navController: NavController,
  authViewModel: AuthViewModelInterface
) {
  var errors by remember { mutableStateOf("") }

  LaunchedEffect(Unit) {
    println("init")
    authViewModel.isUserLoggedIn { isLoggedIn ->
      if (isLoggedIn) navController.navigate(Route.AppHome.route)
    }
  }

  Scaffold { innerPadding ->
    Column(
      modifier = Modifier.padding(innerPadding),
      verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
      Button(
        onClick = {
          authViewModel.signIn(
            onSuccess = {
              navController.navigate(Route.AppHome.route)
            },
            onFailure = {
              errors = it
            }
          )
        }
      ) {
        Text(text = stringResource(R.string.sign_in_button_title))
      }


      Text(text = errors)
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
}