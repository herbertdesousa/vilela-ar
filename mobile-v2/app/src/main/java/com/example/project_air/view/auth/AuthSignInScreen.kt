package com.example.project_air.view.auth

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.example.project_air.R
import com.example.project_air.view.components.Button
import com.example.project_air.view.components.TextField
import com.example.project_air.view.util.UIEvent
import com.example.project_air.viewmodel.auth.AuthViewModel
import kotlinx.coroutines.flow.collectLatest

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AuthSignInScreen (
  navController: NavController,
  authViewModel: AuthViewModel = hiltViewModel()
) {
  LaunchedEffect(true) {
    authViewModel.eventFlow.collectLatest { event ->
      when (event) {
        is UIEvent.NavigateEvent -> navController.navigate(event.route)
        else -> {}
      }
    }
  }

  Scaffold(
  ) { innerPadding ->
    Column(
      modifier = Modifier.padding(innerPadding),
      verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
      Box(
        modifier = Modifier.padding(horizontal = 24.dp),
      ) {
        Text(
          text = stringResource(R.string.auth_signin_screen_title),
          fontSize = 36.sp,
          fontWeight = FontWeight.SemiBold,
          modifier = Modifier.padding(top = 48.dp),
        )

        Column(
          modifier = Modifier.fillMaxHeight(),
          verticalArrangement = Arrangement.spacedBy(48.dp, Alignment.CenterVertically),
        ) {
          Column(verticalArrangement = Arrangement.spacedBy(32.dp)) {
            if (authViewModel.errors.value.isNotEmpty()) {
              Text(
                text = authViewModel.errors.value,
                color = MaterialTheme.colorScheme.error,
                fontSize = 18.sp,
                fontWeight = FontWeight.Bold,
              )
            }

            TextField(
              value = authViewModel.email.value,
              placeholder = "Email",
              onValueChange = { text -> authViewModel.setEmail(text) },
              autoFocus = true,
              keyboardOptions = KeyboardOptions(imeAction = ImeAction.Next),
            )
            TextField(
              value = authViewModel.password.value,
              placeholder = "Password",
              onValueChange = { text -> authViewModel.setPassword(text) },
              keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
              onSubmitDone = { authViewModel.submit() },
            )
          }

          Button(
            label = stringResource(R.string.sign_in_button_title),
            onClick = { authViewModel.submit() }
          )
        }
      }
    }
  }
}