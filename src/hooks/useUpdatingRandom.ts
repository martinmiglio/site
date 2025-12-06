import { useEffect, useState } from 'react'

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

/**
 * A React hook that generates a random number that updates at specified intervals
 * @param interval - Update interval in milliseconds (default: 1000)
 * @param min - Minimum random value (default: 0)
 * @param max - Maximum random value (default: 1)
 * @returns A random number that updates at the specified interval
 */
export function useUpdatingRandom(interval = 10, min = 0, max = 1) {
  const [random, setRandom] = useState(0)

  useEffect(() => {
    // Set initial random value
    setRandom(getRandomInt(min, max))

    const updateRandom = () => {
      setRandom(getRandomInt(min, max))
    }

    const intervalId = setInterval(updateRandom, interval)

    return () => {
      clearInterval(intervalId)
    }
  }, [interval, min, max])

  return random
}
