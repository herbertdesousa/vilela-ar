package com.example.project_air.view.util

sealed class Route(val route: String) {
  object HomeScreen: Route("home")
  object AuthSignInScreen: Route("auth_sign_in")
  object AppHome: Route("app_home")
}