import type { FC } from "react"
import { useRef } from "react"
import type { HTMLMotionProps } from "motion/react"
import { motion, useInView } from "motion/react"
import { cn } from "../../lib/utils"

type AnimationType = "rollIn" | "whipIn" | "whipInUp"

interface Props extends HTMLMotionProps<"div"> {
  text: string
  type?: AnimationType
  as?: "h1" | "h2"
}

const animationVariants = {
  whipInUp: {
    container: {
      hidden: {},
      visible: (i: number = 1) => ({
        transition: { staggerChildren: 0.038, delayChildren: 0.35 * i },
      }),
    },
    child: {
      hidden: {
        y: "200%",
        transition: {
          ease: [0.455, 0.03, 0.515, 0.955] as const,
          duration: 0.7,
        },
      },
      visible: {
        y: 0,
        transition: {
          ease: [0.5, -0.15, 0.25, 1.05] as const,
          duration: 1.1,
        },
      },
    },
  },
  rollIn: {
    container: {
      hidden: {},
      visible: {},
    },
    child: {
      hidden: {
        opacity: 0,
        y: `0.25em`,
      },
      visible: {
        opacity: 1,
        y: `0em`,
        transition: {
          duration: 1.15,
          ease: [0.65, 0, 0.75, 1] as const,
        },
      },
    },
  },
  whipIn: {
    container: {
      hidden: {},
      visible: {},
    },
    child: {
      hidden: {
        opacity: 0,
        y: `0.35em`,
      },
      visible: {
        opacity: 1,
        y: `0em`,
        transition: {
          duration: 0.45,
          ease: [0.85, 0.1, 0.9, 1.2] as const,
        },
      },
    },
  },
}

const TextAnimate: FC<Props> = ({ text, type = "whipInUp", className, as: As = "h2" }: Props) => {
  const ref = useRef(null)
  useInView(ref, { once: true })

  const { container, child } = animationVariants[type]

  if (type === "rollIn" || type === "whipIn") {
    return (
      <As className={cn("text-3xl font-black md:text-5xl", className)}>
        {text.split(" ").map((word, index) => (
          <motion.span
            ref={ref}
            className="inline-block mr-[0.25em] whitespace-nowrap"
            aria-hidden="true"
            key={index}
            initial="hidden"
            animate="visible"
            variants={container}
            transition={{
              delayChildren: index * 0.22,
              staggerChildren: 0.048,
            }}
          >
            {word.split("").map((char, charIndex) => (
              <motion.span
                aria-hidden="true"
                key={charIndex}
                variants={child}
                className="inline-block -mr-[0.01em]"
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        ))}
      </As>
    )
  }

  return (
    <As className={cn("text-4xl font-black py-5 pb-8 px-8 md:text-5xl w-full flex justify-center", className)}>
      <span
        ref={ref}
        style={{ display: "flex", flexWrap: "wrap", overflow: "hidden", justifyContent: "center" }}
      >
        {text.split(" ").map((word, wordIndex) => (
          <motion.span
            key={wordIndex}
            className="inline-block mr-[0.35em]"
            variants={container}
            initial="hidden"
            animate="visible"
            transition={{
              delayChildren: wordIndex * 0.28,
              staggerChildren: 0.042,
            }}
          >
            {word.split("").map((letter, letterIndex) => (
              <motion.span key={letterIndex} variants={child} className="inline-block">
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.span>
        ))}
      </span>
    </As>
  )
}

export { TextAnimate }
export default TextAnimate
