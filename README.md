# space-invaders-html

Space Invaders but in html, css, and js.

Project started on 7 Oct 2023.

I tried making the game in Unity a while back but I couldn't figure out how to get the invaders to move downwards whenever they hit a border, and they kept teleporting through the borders cuz I didn't know how to use the movement coordinates thingy (sorry, I forgot what it's called), so I gave up.

I started this project hoping that I can complete it since I'm more familiar with web programming. I might try making the game in Unity again if this project succeeds.

===========================================================================

## Editable variables in game.js:
<ul>
  <li>Grid dimensions:
    <ul>
      <li>rowSize</li>
      <li>columnSize</li>
    </ul>
  </li>
  <li>Invader quantity:
    <ul>
      <li>invaderColumnSize</li>
      <li>invaderColumnGaps</li>
      <li>squidRowSize</li>
      <li>crabRowSize</li>
      <li>octoRowSize</li>
    </ul>
  </li>
  <li>Bunker details:
    <ul>
      <li>bunkerColumnSize</li>
      <li>bunkerHealthPoints</li>
    </ul>
  </li>
  <li>Pre-game countdown:
    <ul>
      <li>countdownDuration</li>
    </ul>
  </li>
  <li>Interval for moving invaders:
    <ul>
      <li>initialInterval</li>
      <li>intervalDecrementMultiplier</li>
    </ul>
  </li>
  <li>Tank details:
    <ul>
      <li>multipleBullets <i><b>(can currently only be set to false)</b></i></li>
      <li>tankBulletInterval</li>
      <li>tankBulletBunkerDamageInterval</li>
    </ul>
  </li>
</ul>

===========================================================================

## References:
<ul>
  <li>
    Tank Controls: <br>
    https://stackoverflow.com/questions/16345870/keydown-keyup-events-for-specific-keys
  </li>
</ul>
