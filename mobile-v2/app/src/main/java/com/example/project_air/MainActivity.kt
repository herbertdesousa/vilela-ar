package com.example.project_air

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.project_air.ui.theme.ProjectAirTheme
import com.example.project_air.view.Home
import com.example.project_air.view.app.AppHome
import com.example.project_air.view.auth.AuthSignInScreen
import com.example.project_air.view.util.Route
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    setContent {
      val navController = rememberNavController()

      ProjectAirTheme {
        NavHost(navController = navController, startDestination = Route.HomeScreen.route) {
          composable(route = Route.HomeScreen.route) {
            Home(navController)
          }
          composable(route = Route.AuthSignInScreen.route) {
            AuthSignInScreen(navController)
          }
          composable(route = Route.AppHome.route) {
            AppHome(navController)
          }
        }
      }
    }
  }
}
