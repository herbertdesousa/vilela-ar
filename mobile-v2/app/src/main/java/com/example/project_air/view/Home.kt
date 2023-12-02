package com.example.project_air.view

import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.example.project_air.data.repository.util.UserState
import com.example.project_air.view.util.Route
import com.example.project_air.viewmodel.auth.AuthViewModel

@Composable
fun Home(
  navController: NavController,
  authViewModel: AuthViewModel = hiltViewModel()
) {
  val user = authViewModel.user.value

  LaunchedEffect(user) {
    when (user) {
      is UserState.UnAuthed -> navController.navigate(Route.AuthSignInScreen.route) { popUpTo(0) }
      is UserState.Success -> navController.navigate(Route.AppHome.route) { popUpTo(0) }
      else -> {}
    }
  }
}