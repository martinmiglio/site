// a composable to generate an updating random number
import { ref } from 'vue'

export function useUpdatingRandom(interval = 1000, min = 0, max = 1) {
  const random = ref(Math.random())

  const getRandomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min

  const updateRandom = () => {
    random.value = getRandomInt(min, max)
  }

  setInterval(updateRandom, interval)

  return random
}
