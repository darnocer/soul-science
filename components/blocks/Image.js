import Image from 'next/image'

const CustomImage = ({ src, alt, borderRadius = 'rounded-md', width, height, ...rest }) => (
  <div className="my-4 flex justify-center">
    <Image
      className={borderRadius}
      src={src}
      alt={alt || 'image'}
      width={width}
      height={height}
      {...rest}
    />
  </div>
)

export default CustomImage
