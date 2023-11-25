package com.example.project_air.view.util

sealed class UIEvent {
  data class NavigateEvent(val route: String): UIEvent()
}