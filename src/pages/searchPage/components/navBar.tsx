import React from 'react';
import {useAtom, useSetAtom} from 'jotai';
import {
    initSearchResults,
    PageStatus,
    pageStatusAtom,
    queryAtom,
    searchResultsAtom,
} from '../store/atoms';
import useSearch from '../hooks/useSearch';
import {addHistory} from '../common/historySearch';
import {SearchNavBar} from '@/components/navigation';

export default function NavBar() {
    const search = useSearch();
    const [query, setQuery] = useAtom(queryAtom);
    const setPageStatus = useSetAtom(pageStatusAtom);
    const setSearchResultsState = useSetAtom(searchResultsAtom);

    const onSearchSubmit = async () => {
        if (query === '') {
            return;
        }
        setSearchResultsState(initSearchResults);
        setPageStatus(prev =>
            prev === PageStatus.EDITING ? PageStatus.SEARCHING : prev,
        );
        await search(query, 1);
        await addHistory(query);
    };

    const handleQueryChange = (text: string) => {
        if (text === '') {
            setPageStatus(PageStatus.EDITING);
        }
        setQuery(text);
    };

    const handleFocus = () => {
        setPageStatus(PageStatus.EDITING);
    };

    const handleClear = () => {
        setPageStatus(PageStatus.EDITING);
    };

    return (
        <SearchNavBar
            value={query}
            onChangeText={handleQueryChange}
            onSubmit={onSearchSubmit}
            onFocus={handleFocus}
            onClear={handleClear}
            placeholder="输入要搜索的歌曲"
            autoFocus
        />
    );
}
