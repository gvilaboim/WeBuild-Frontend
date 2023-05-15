import React from 'react'
import PublicSubsection from './PublicSubsection'

const PublicSection = ({ section }) => {

    console.log(section)
  return (
    <div>
      {section.subsections.length > 0 &&
        section.subsections.map((subsection) => (
          <PublicSubsection
            key={subsection._id}
            subsection={subsection}
          />
        ))}
    </div>
  )
}

export default PublicSection
