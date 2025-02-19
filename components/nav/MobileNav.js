import { useState } from 'react'
import Link from '@/components/links/Link'
import headerNavLinks from '@/data/nav/headerNavLinks'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(
    Object.fromEntries(headerNavLinks.map((link) => [link.title, true])) // Default all dropdowns to open
  )

  const onToggleNav = () => {
    setNavShow((status) => {
      document.body.style.overflow = status ? 'auto' : 'hidden'
      return !status
    })
  }

  const toggleDropdown = (title) => {
    setDropdownOpen((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  return (
    <div className='sm:hidden'>
      <button type='button' className='ml-1 mr-1 h-8 w-8 rounded py-1' aria-label='Toggle Menu' onClick={onToggleNav}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          className='text-gray-900 dark:text-gray-100'
        >
          <path
            fillRule='evenodd'
            d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
            clipRule='evenodd'
          />
        </svg>
      </button>
      <div
        className={`fixed top-0 left-0 z-10 h-full w-full transform bg-gray-200 opacity-95 duration-300 ease-in-out dark:bg-gray-900 ${
          navShow ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex justify-end'>
          <button type='button' className='mr-5 mt-11 h-8 w-8 rounded' aria-label='Close Menu' onClick={onToggleNav}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='text-gray-900 dark:text-gray-100'
            >
              <path
                fillRule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>
        <nav className='fixed mt-8 h-full'>
          {headerNavLinks.map((link) => (
            <div key={link.title} className='px-12 py-4'>
              {link.dropdown ? (
                <>
                  <button
                    className='flex items-center justify-between w-full text-3xl font-bold tracking-widest text-gray-900 dark:text-gray-100'
                    onClick={() => toggleDropdown(link.title)}
                  >
                    <span>{link.title}</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      className={`h-5 w-5 transition-transform ${dropdownOpen[link.title] ? 'rotate-180' : ''}`}
                      style={{ flexShrink: 0 }} // Prevents shifting
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </button>
                  <ul
                    className={`mt-2 pl-4 transition-all duration-300 ${
                      dropdownOpen[link.title] ? 'max-h-screen' : 'max-h-0 overflow-hidden'
                    }`}
                  >
                    {link.dropdown.map((dropdownLink) => (
                      <li key={dropdownLink.title} className='no-arrow py-2 font-semibold'>
                        <Link
                          href={dropdownLink.href}
                          className='text-2xl text-gray-700 dark:text-gray-300'
                          onClick={onToggleNav}
                        >
                          {dropdownLink.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  href={link.href}
                  className='text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100'
                  onClick={onToggleNav}
                >
                  {link.title}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default MobileNav
