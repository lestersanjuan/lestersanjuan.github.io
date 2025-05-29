import * as React from 'react';

import {
    DataGrid,
    GridColDef,
    GridValueGetter,
} from '@mui/x-data-grid';


//Time Slot Positions Breaks Monday Tuesday Wednesday Thursday Time Slot Positions Breaks Friday Saturday Time Slot Positions Breaks Sunday
function Schedule() {
    const row = [
        {
            id: 1,
            timeSlot1: " 2pm - 7pm",
            timeSlot2: " 2pm - 7pm",
            timeSlot3: " 2pm - 7pm",
            Positions: "Backup",
            Positions2: "Backup",
            Positions3: "Backup",
        },
        {
            id: 2,
            timeSlot1: " 12pm - 5:30pm",
            timeSlot2: " 11am - 4:30pm",
            timeSlot3: " 11pm - 4:45pm",
            Positions: "Bar 2",
            Positions2: "Bar 2",
            Positions3: "Bar 2",
        },
        {
            id: 3,
            timeSlot1: " 11am - 4:45pm",
            timeSlot2: " 11am - 5:45pm",
            timeSlot3: " 11am - 4:45pm",
            Positions: "Toppings",
            Positions2: "Toppings",
            Positions3: "Toppings",
        },
        {
            id: 4,
            timeSlot1: " 11am - 4:45pm",
            timeSlot2: " 12am - 5:45pm",
            timeSlot3: " 11am - 4:45pm",
            Positions: "Bar",
            Positions2: "Bar",
            Positions3: "Bar",
        },
        {
            id: 5,
            timeSlot1: " 11am - 4:45pm",
            timeSlot2: " 12am - 5:45pm",
            timeSlot3: " 12am - 4:45pm",
            Positions: "Sealing",
            Positions2: "Sealing",
            Positions3: "Sealing",
        },
        {
            id: 6,
            timeSlot1: " 4:45pm - 11:30pm",
            timeSlot2: " 5:45pm - 12:30am",
            timeSlot3: " 4:45pm - 11:30pm",
            Positions: "Bar",
            Positions2: "Bar",
            Positions3: "Bar",
        },
        {
            id: 7,
            timeSlot1: " 4:45pm - 11:30pm",
            timeSlot2: " 5:45pm - 12:30am",
            timeSlot3: " 4:45pm - 11:30pm",
            Positions: "Toppings",
            Positions2: "Toppings",
            Positions3: "Toppings",
        },
        {
            id: 8,
            timeSlot1: " 6pm - 11:30pm",
            timeSlot2: " 5:45pm - 12:30am",
            timeSlot3: " 4:45pm - 11:30pm",
            Positions: "Bar 2",
            Positions2: "Bar 2",
            Positions3: "Bar 2",
        },
        {
            id: 9,
            timeSlot1: " 6pm - 11:30pm",
            timeSlot2: " 5:45pm - 12:30am",
            timeSlot3: " 4:45pm - 11:30pm",
            Positions: "Sealing",
            Positions2: "Sealing",
            Positions3: "Sealing",
        },
        {
            id: 10,
            timeSlot1: " 7pm - 11:30pm",
            timeSlot2: " 7pm - 12:30am",
            timeSlot3: " 6:30pm - 11:30pm",
            Positions: "Backup",
            Positions2: "Backup",
            Positions3: "Backup",
        },
        {
            id: 11,
            timeSlot1: " 11am - 3:30pm",
            timeSlot2: " 11pm - 4pm",
            timeSlot3: " 11pm - 3:30pm",
            Positions: "Training",
            Positions2: "Training",
            Positions3: "Training",
        },
        {
            id: 12,
            timeSlot1: " 7pm - 11:30pm",
            timeSlot2: " 7:30m - 12:30pm",
            timeSlot3: " 7pm - 11:30pm",
            Positions: "Training",
            Positions2: "Training",
            Positions3: "Training",
        }
    ]
    const col = [
        {
            field: 'timeSlot1',
            headerName: 'Time Slot',
            width: 150,
        },
        {
            field: 'Positions',
            headerName: 'Positions',
            width: 100,
        },
        {
            field: 'Breaks',
            headerName: 'Breaks',
            width: 75,
        },
        {
            field: 'Monday',
            headerName: 'Monday',
            width: 100,
        },
        {
            field: 'Tuesday',
            headerName: 'Tuesday',
            width: 100,
        },
        {
            field: 'Wednesday',
            headerName: 'Wednesday',
            width: 100,
        },
        {
            field: 'Thursday',
            headerName: 'Thursday',
            width: 100,
        },
        {
            field: 'timeSlot2',
            headerName: 'Time Slot',
            width: 150,
        },
        {
            field: 'Positions2',
            headerName: 'Positions',
            width: 100,
        },
        {
            field: 'Breaks2',
            headerName: 'Breaks',
            width: 100,
        },
        {
            field: 'Friday',
            headerName: 'Friday',
            width: 100,
        },
        {
            field: 'Saturday',
            headerName: 'Saturday',
            width: 100,
        },
        {
            field: 'timeSlot3',
            headerName: 'Time Slot',
            width: 150,
        },
        {
            field: 'Positions3',
            headerName: 'Positions',
            width: 100,
        },
        {
            field: 'Breaks3',
            headerName: 'Breaks',
            width: 100,
        },
        {
            field: 'Sunday',
            headerName: 'Sunday',
            width: 100,
        }
    ]


return <>
    <h1>Schedule for today!</h1>
    <div style={{ height: 1000, width: '100%' }}>
        <DataGrid
            rows={row}
            columns={col}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 12,
                    },
                },
            }}
            pageSizeOptions={[12]}
            disableRowSelectionOnClick
        />
    </div>
</>
}


export default Schedule;