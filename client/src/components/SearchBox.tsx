import { useState, useRef } from 'react';
import { Search, X } from 'react-feather';

interface SearchProps {
  placeHolder?: string,
  onSubmit: (searchTerm: string) => void
  ariaLabel?: string;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  darkMode?: boolean;
}

const SearchBox = ({ placeHolder, onSubmit, ariaLabel = "" }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      return onSubmit(searchTerm);
    }
  };


  return (
    <div >
      <div className="search-input-wrapper" ref={searchRef}>
        <form onSubmit={handleSubmit} >
          <button
            type="submit"
            className="search-icon"
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          <input
            type="text"
            placeholder={placeHolder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            aria-label={ariaLabel}
          />
          <button
            type="button"
            className="search-icon"
            onClick={() => setSearchTerm('')}
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        </form>

      </div>
    </div>
  );
};

export default SearchBox;