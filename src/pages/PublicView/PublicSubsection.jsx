

const PublicSubsection = ({ subsection }) => {

   console.log(subsection) 
  return <div>
    {subsection.components.length > 0 && subsection.components.map(component => component.name) }
  </div>
}

export default PublicSubsection
