package com.example.project_air.view.app

import android.os.Build
import androidx.annotation.RequiresApi
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavHostController
import com.example.project_air.view.util.UIEvent
import com.example.project_air.viewmodel.auth.AuthViewModel
import kotlinx.coroutines.flow.collectLatest
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

const val DAYS_IN_MINUTES = 1440
const val INTERVAL_IN_MINUTES_HEIGHT_IN_DP = 128
const val DIVIDER_HEIGHT_IN_DP = 2

data class Appointment(
  val startedAt: LocalDateTime,
  val endedAt: LocalDateTime,
)

@RequiresApi(Build.VERSION_CODES.O)
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

  val intervalInMinutes by remember { mutableIntStateOf(60) }

  val patternFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")

  val appointments = mutableListOf(
    Appointment(
      startedAt = LocalDateTime.parse("16/12/2020 00:00", patternFormatter),
      endedAt = LocalDateTime.parse("16/12/2020 02:00", patternFormatter),
    ),
    Appointment(
      startedAt = LocalDateTime.parse("16/12/2020 01:00", patternFormatter),
      endedAt = LocalDateTime.parse("16/12/2020 04:00", patternFormatter),
    ),
  )

  val leftListInHours = (0..DAYS_IN_MINUTES / intervalInMinutes).map {
    val minutes = it * intervalInMinutes
    val hours = minutes / 60
    val remainingMinutes = (minutes % 60).toString().padStart(2, '0')

    "$hours:$remainingMinutes"
  }

  val marginTop = (INTERVAL_IN_MINUTES_HEIGHT_IN_DP / 2)

  val dividerList = List(leftListInHours.size) { index ->
    val pastItemsHeight = INTERVAL_IN_MINUTES_HEIGHT_IN_DP * index

    (marginTop + pastItemsHeight)
  }

  Scaffold { innerPadding ->
    Column(
      modifier = Modifier
        .padding(innerPadding)
        .fillMaxSize()
        .verticalScroll(rememberScrollState())
    ) {
      Row(
        modifier = Modifier
          .fillMaxSize()
          .padding(horizontal = 16.dp)
      ) {
        Column(
          modifier = Modifier.width(42.dp),
          horizontalAlignment = Alignment.CenterHorizontally
        ) {
          leftListInHours.forEach {
            Column(
              modifier = Modifier
                .rotate(-90F)
                .height(INTERVAL_IN_MINUTES_HEIGHT_IN_DP.dp),
              verticalArrangement = Arrangement.Center,
              horizontalAlignment = Alignment.CenterHorizontally
            ) {
              Text(
                text = it,
                textAlign = TextAlign.Center,
                maxLines = 1,
                softWrap = false
              )
            }
          }
        }

        Box(
          modifier = Modifier
            .offset(y = marginTop.dp)
            .height((128 * (leftListInHours.size - 1)).dp)
            .width(2.dp)
            .background(MaterialTheme.colorScheme.onBackground.copy(alpha = 0.5f))
        )

        Box(Modifier.fillMaxSize()) {
          dividerList.forEach {
            Box(
              modifier = Modifier
                .offset(y = it.dp)
                .height(DIVIDER_HEIGHT_IN_DP.dp)
                .fillMaxWidth()
                .background(MaterialTheme.colorScheme.onBackground.copy(alpha = 0.3f))
            )
          }

          appointments.map {
            val decimalStartedAtHour = it.startedAt.hour.toFloat() + (it.startedAt.minute * 100f / 60f / 100f)
            val decimalEndedAtHour = it.endedAt.hour.toFloat() + (it.endedAt.minute * 100f / 60f / 100f)

            val paddingTop = (marginTop + (decimalStartedAtHour * INTERVAL_IN_MINUTES_HEIGHT_IN_DP))
            val height = (decimalEndedAtHour - decimalStartedAtHour) * INTERVAL_IN_MINUTES_HEIGHT_IN_DP

            println(decimalStartedAtHour)
            println(decimalEndedAtHour)

            object { val paddingTop = paddingTop; val height = height }
          }.forEach {
            Box(
              modifier = Modifier.padding(
                start = 2.dp,
                top = (it.paddingTop).dp
              )
            ) {
              Column(
                modifier = Modifier
                  .width(200.dp)
                  .defaultMinSize(minHeight = 72.dp)
                  .height((it.height).dp)
                  .shadow(1.5.dp)
                  .clip(shape = RoundedCornerShape(16.dp))
                  .background(MaterialTheme.colorScheme.onBackground)
                  .padding(32.dp, 24.dp)
              ) {
                Text(
                  text = "Agendamento",
                  fontSize = 18.sp,
                  fontWeight = FontWeight.SemiBold,
                  color = MaterialTheme.colorScheme.background
                )
              }
            }
          }
        }
      }
    }
  }
}