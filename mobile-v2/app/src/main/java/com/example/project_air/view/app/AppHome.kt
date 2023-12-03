package com.example.project_air.view.app

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavHostController
import com.example.project_air.R
import com.example.project_air.view.util.UIEvent
import com.example.project_air.viewmodel.auth.AuthViewModel
import kotlinx.coroutines.flow.collectLatest

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AppHome(
  navController: NavHostController,
  authViewModel: AuthViewModel = hiltViewModel()
) {
  LaunchedEffect(true) {
    authViewModel.eventFlow.collectLatest { event ->
      when (event) {
        is UIEvent.NavigateEvent -> navController.navigate(event.route)
      }
    }
  }

  Scaffold { innerPadding ->
    Column(
      modifier = Modifier.padding(innerPadding),
      verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
      Text(text = "Hello")

      Button(
        onClick = { authViewModel.logout() }) {
        Text(text = stringResource(R.string.signout_button_title))
      }
    }
  }
}