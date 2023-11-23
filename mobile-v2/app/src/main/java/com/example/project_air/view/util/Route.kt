package com.example.project_air.view.util

sealed class Route(val route: String) {
  object AuthSignInScreen: Route("auth_sign_in")
}