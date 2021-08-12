/** @format */

import React, { useRef, useState } from 'react';
import { Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

export default function CustomSearch(props) {
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const searchInput = useRef();
	const getColumnSearchProps = (dataIndex = props) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={(node) => {
						searchInput.current = node;
					}}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{ marginBottom: 8, display: 'block' }}
				/>
				<Space>
					<Button
						type='primary'
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						style={{ width: 100, padding: 15, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
						Search
					</Button>
					<Button
						onClick={() => handleReset(clearFilters)}
						style={{ width: 100, padding: 15, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
						Reset
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,

		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current.select(), 100);
			}
		},
		onFilter: (value, record) => (record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : ''),

		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			),
	});
	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};
	const handleReset = (clearFilters) => {
		clearFilters();
		setSearchText('');
	};
	return getColumnSearchProps(props);
}
