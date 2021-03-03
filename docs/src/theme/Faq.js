import React, {useState} from 'react'
import cn from 'classnames'
import styles from './faq.module.css'

const Question = ({children, tags, selectedTags}) =>
  // check if any element in tags is included in selectedTags
  tags.reduce((acc, curr) => selectedTags.find(t => t === curr) || acc, false) ? (
    <div className={cn(tags.map((tag) => styles[tag]))}>{children}</div>
  ) : null

const TagButton = ({tag, isSelected, children, toggleSelected}) => (
  <li
    className={cn(
      {[styles.selected]: isSelected},
      styles[tag],
      'pills',
      'pills__item',
      {'styles.pills__item--active': isSelected}
    )}
    onClick={toggleSelected}
  >
    {children}
  </li>
)

const Faq = ({tags, switchofftags}) => {
  const [selectedTags, setSelectedTags] = useState(
    tags.filter((t) => !switchofftags.includes(t))
  )
  const displayFunc = (tags) => {
    for (const tag of tags) {
      // for (var i = 0; i < tags.length; i++) {
      if (selectedTags.find((t) => t === tag)) {
        return 'block'
      }
    }
    return 'none'
  }

  return (
    <>
      {tags.map((tag) => (
        <TagButton
          key={tag}
          tag={tag}
          isSelected={selectedTags.find((t) => t === tag)}
          toggleSelected={() => {
            if (selectedTags.find((t) => t === tag)) {
              setSelectedTags(selectedTags.filter((t) => t !== tag))
            } else {
              setSelectedTags([...selectedTags, tag])
            }
          }}
        >
          #{tag}
        </TagButton>
      ))}
      {/* from here on generate by script */}
      <Question selectedTags={selectedTags} tags={["asdf", "asdf"]}>
        #kratos #database <br />
        <p>
          <strong>Q</strong>: We want to seperate our customers and employees, so we
          store them in different databases. But we would like to have them use the
          same login dialog for our portal. How can I achieve that with Ory Kratos?
        </p>
        <p>
          <strong>A</strong>: You can deploy Ory Kratos two times, and use the same
          login/registration endpoints if you like. You may need to tell you
          login/registration ui which Kratos it is supposed to talk to.
        </p>
      </Question>
    </>
  )
}

export {Faq, Question}
