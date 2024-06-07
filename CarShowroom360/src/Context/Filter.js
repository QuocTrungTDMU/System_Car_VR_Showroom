import React, { useState } from 'react';
import FilterSelect from 'react-filter-select';

const App = () => {
  const [khoangGia, setKhoangGia] = useState([]);
  const [namSanXuat, setNamSanXuat] = useState([]);

  const dataKhoangGia = [
    { label: 'Dưới 1 tỷ', value: 'duoi1ty' },
    { label: '1 tỷ - 2 tỷ', value: '1ty-2ty' },
    { label: '2 tỷ - 3 tỷ', value: '2ty-3ty' },
    { label: 'Hơn 3 tỷ', value: 'hon3ty' },
  ];

  const dataNamSanXuat = [
    { label: '2022', value: '2022' },
    { label: '2023', value: '2023' },
    { label: '2004', value: '2004' },
    { label: 'Trước 2008', value: 'truoc2008' },
  ];

  const handleKhoangGiaChange = (selected) => {
    setKhoangGia(selected);
  };

  const handleNamSanXuatChange = (selected) => {
    setNamSanXuat(selected);
  };

  return (
    <div>
      <h2>Khoảng giá</h2>
      <FilterSelect
        options={dataKhoangGia}
        value={khoangGia}
        onChange={handleKhoangGiaChange}
        placeholder="Chọn khoảng giá"
      />

      <h2>Năm sản xuất</h2>
      <FilterSelect
        options={dataNamSanXuat}
        value={namSanXuat}
        onChange={handleNamSanXuatChange}
        placeholder="Chọn năm sản xuất"
      />
    </div>
  );
};

export default App;
