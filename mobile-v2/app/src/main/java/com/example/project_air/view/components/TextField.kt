package com.example.project_air.view.components

import android.view.KeyEvent
import androidx.compose.animation.Animatable
import androidx.compose.animation.core.tween
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.composed
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.input.key.onKeyEvent
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

fun Modifier.bottomBorder(strokeWidth: Dp, color: Color) = composed(factory = {
  val density = LocalDensity.current
  val strokeWidthPx = density.run { strokeWidth.toPx() }

  Modifier.drawBehind {
    val width = size.width
    val height = size.height - strokeWidthPx / 2

    drawLine(
      color = color,
      start = Offset(x = 0f, y = height),
      end = Offset(x = width, y = height),
      strokeWidth = strokeWidthPx
    )
  }
})

@Composable
fun TextField(
  value: String,
  onValueChange: (String) -> Unit,
  placeholder: String,
  autoFocus: Boolean = false,
  hideKeyboard: Boolean = false,
  keyboardOptions: KeyboardOptions = KeyboardOptions.Default,
  onSubmitDone: () -> Unit = { },
) {
  val focusRequester = remember { FocusRequester() }

  var isFocused by remember { mutableStateOf(false) }

  LaunchedEffect(Unit) {
    if (autoFocus) focusRequester.requestFocus()
  }

  val color = remember { Animatable(Color.Gray) }

  val changedColor = when {
    value.isNotEmpty() -> MaterialTheme.colorScheme.primary
    isFocused -> MaterialTheme.colorScheme.onBackground
    else -> MaterialTheme.colorScheme.onBackground.copy(alpha = 0.5f)
  }

  LaunchedEffect(changedColor) {
    color.animateTo(changedColor, animationSpec = tween(300))
  }

  LaunchedEffect(hideKeyboard) {
    focusRequester.freeFocus()
  }

  Box(
    modifier = Modifier
      .bottomBorder(1.dp, color.value)
      .padding(bottom = 16.dp)
  ) {
    if (value.isEmpty()) {
      Text(
        text = placeholder,
        color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.7f),
        fontSize = 18.sp,
      )
    }

    BasicTextField(
      value = value,
      onValueChange = onValueChange,
      singleLine = true,
      keyboardOptions = keyboardOptions,
      keyboardActions = KeyboardActions(
        onDone = { onSubmitDone() }
      ),
      textStyle = TextStyle(color = MaterialTheme.colorScheme.onSurface, fontSize = 18.sp),
      cursorBrush = SolidColor(MaterialTheme.colorScheme.onSurface),
      modifier = Modifier
        .padding(0.dp)
        .fillMaxWidth()
        .focusRequester(focusRequester)
        .onFocusChanged { isFocused = it.isFocused }
        .onKeyEvent {
          if (it.nativeKeyEvent.keyCode == KeyEvent.KEYCODE_ENTER) {
            onSubmitDone()
          }

          false
        }
    )
  }
}
