import { selectCurrentInstance} from "@/redux/features/instanceList/instanceList.selector";
import { useSelector } from "react-redux"; 
import CustomTable from "@/components/ui/table/CustomTable"; 


export default function CloudInstances() {

  const data= useSelector(selectCurrentInstance);
console.log({data})
  return (
    <CustomTable
      data={[data.instances]}
      isPagination={true}
      columns={[
        { header: "UUID / Instance Name", accessorKey: "uuid" },
        { header: "Region", accessorKey: "region" },
        { header: "Size", accessorKey: "instanceType" },
        { header: "Quantity", accessorKey: "quantity" },
        { header: "No.of Hours", accessorKey: "noOfHours" },
        { header: "Pricing Model", accessorKey: "pricingModel" },
      ]}
      variant="primary"
      sx={{
        height: "100%",
        borderRadius: 0,
        p: 2,
        pb: 2,
        mt: 2,
        overflowY: "auto",
        backgroundColor: "background.paper",
      }}
    />
  );
}
