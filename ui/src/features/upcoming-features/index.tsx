export default function UpcomingFeatures () {
  return (
      <>
        <h1 className="text-xl font-bold">Upcoming features</h1>
        <ul className="list-disc list-inside">
          <li className=''>Plan is to base most of this off of <a href="https://flowbite.com">https://flowbite.com</a> for basic components</li>
          <li className=''>Make a `Features to build` page so I don`t have to write this in the readme then never read it. And add a budget number checker - you could scan the internet for the best deals, then compare what the person is payign for energy/broadband/mobile etc. And tell them they`re paying a lot or a little for the thing.</li>
          <li>Focus on writing the ui for the month budget section - forget currency for now. think in the background and tackle it later</li>
          <li>Add a i18n lib - for code we will keep - https://react.i18next.com/latest/using-with-hooks</li>
          <li>Number formatter: https://github.com/actualbudget/actual/blob/de232b3ff05fad8b67dd295057cd30d3ee42c5ac/packages/loot-core/src/shared/util.js#L311</li>
          <li>React hook form: https://react-hook-form.com/</li>
          <li>Make an input currency component like this - should not allow entering invalid values - should probably lock in 2 decimal places: https://primefaces.org/primevue/inputnumber </li>
        </ul>
      </>
  )
}
