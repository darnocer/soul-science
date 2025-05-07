export default function AudioPlayer({ file }) {
  if (!file) return <p className='text-sm italic text-gray-500'>No audio file available.</p>

  return (
    <div className='w-full'>
      <audio controls preload='metadata' className='w-full'>
        <source src={file} type='audio/mp3' />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}
