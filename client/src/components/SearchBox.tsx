import { useState, useRef } from 'react';

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

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="search-bar" ref={searchRef}>
      <input
        type="text"
        placeholder={placeHolder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        aria-label={ariaLabel}
      />
      <div className="search-buttons">
        {searchTerm && (
          <button 
            type="button" 
            className="clear-btn" 
            onClick={clearSearch}
            aria-label="Clear search"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
        <button 
          type="submit" 
          className="search-btn" 
          onClick={handleSubmit}
          aria-label="Search"
        >
          <i className="fas fa-search"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchBox;