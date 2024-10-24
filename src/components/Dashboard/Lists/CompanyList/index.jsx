import { Table, Select, Tag } from "antd";
import { Input } from "antd";
import { useEffect, useState } from "react";
import EditCompanyDrawer from "@components/EditCompany";
import { getCompanies } from "@services/apiCompany";
import { useAuth } from "@context/AuthContext";
const { Search } = Input;

const statusFilterData = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "active",
    label: "Active",
  },
  {
    value: "in_active",
    label: "Inactive",
  },
];

export default function CompanyList({ revalidateCompanylisting }) {
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });
  const { user } = useAuth();
  const isSiteAdmin = user.role.name === "Company";
  const isSuperAdmin = user.role.name === "Super Admin";
  const [companiesRevalidate, setCompaniesRevalidate] = useState(false);

  let columns = [
    {
      title: "Status",
      dataIndex: "status",
      render: (tags) => (
        <Tag color={tags === "active" ? "green" : "default"}>
          {tags.replace(tags[0], tags[0].toUpperCase())}
        </Tag>
      ),
      width: "10%",
    },
    {
      title: "Company",
      dataIndex: "companyName",
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: "20%",
    },
    {
      title: "Website",
      dataIndex: "website",
      width: "25%",
    },
    {
      title: "Total Users",
      dataIndex: "totalUser",
      width: "25%",
    },
  ];

  if (isSuperAdmin)
    columns = [
      ...columns,
      {
        title: "",
        dataIndex: "dataToEdit",
        render: (item) => (
          <EditCompanyDrawer
            dataToEdit={item}
            onCompanyRevalidate={() => setCompaniesRevalidate((is) => !is)}
          />
        ),
        width: "100%",
      },
    ];

  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true);
      try {
        const resp = await getCompanies();
        if (resp.status >= 200 && resp.status < 300) {
          const data = resp.data.data;
          const dataTable = data.map((item) => {
            console.log("ITEM", item.company);
            return {
              id: item.company.id,
              status: item.company.status,
              companyName: item.company.name,
              website: item.company.website,
              siteAdmin: item.company.site_admin?.name || "",
              totalUser: item.company.users_count,
              dataToEdit: item,
            };
          });
          setCompanies(dataTable);
        }

        if (resp.status === 401) {
          logout();
          navigate("/");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchCompanies();
  }, [companiesRevalidate, revalidateCompanylisting]);

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const paginatedData = companies.slice(
    (pagination.current - 1) * pagination.pageSize,
    pagination.current * pagination.pageSize
  );

  return (
    <>
      {!isSiteAdmin && (
        <div className="flex flex-row items-center gap-8">
          <Search
            className="w-1/2"
            size="large"
            placeholder="Search company name ..."
            onSearch={(value) => console.log(value)}
          />
          <Select
            defaultValue="all"
            size="large"
            className="w-1/2"
            options={statusFilterData}
          />
        </div>
      )}

      <Table
        style={{ width: "100%" }}
        columns={columns}
        dataSource={paginatedData}
        pagination={{
          ...pagination,
          total: companies.length,
        }}
        loading={isLoading}
        size="large"
        className="w-full mt-6"
        onChange={handleTableChange}
        bordered
      />
    </>
  );
}
