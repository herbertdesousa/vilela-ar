package com.example.project_air

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.project_air.view.app.AppHome
import com.example.project_air.view.auth.AuthSignInScreen
import com.example.project_air.view.util.Route
import com.example.project_air.viewmodel.auth.FirebaseAuthViewModel
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    setContent {
      val navController = rememberNavController()
      val authViewModel = FirebaseAuthViewModel()

      NavHost(navController = navController, startDestination = Route.AuthSignInScreen.route) {
        composable(route = Route.AuthSignInScreen.route) {
          AuthSignInScreen(navController, authViewModel)
        }
        composable(route = Route.AppHome.route) {
          AppHome(navController, authViewModel)
        }
      }
    }
  }
}
