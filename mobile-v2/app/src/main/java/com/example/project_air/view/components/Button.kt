package com.example.project_air.view.components

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

@Composable
fun Button(onClick: () -> Unit, label: String) {
  androidx.compose.material3.Button(
    onClick = onClick,
    modifier = Modifier.fillMaxWidth(),
    shape = RoundedCornerShape(4.dp)
  ) {
    Text(
      text = label,
      fontWeight = FontWeight.Medium
    )
  }
}