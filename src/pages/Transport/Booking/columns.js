import React  from 'react'
import { Link } from 'react-router-dom'
import Chip from 'material-ui/Chip'
import Button from 'material-ui/Button'

export default [
  {
    id: 'transport_id',
    label: 'Booking #',
    props: {
      sortable: 'true',
      padding: 'dense',
    }
  },
  {
    id: 'manifest_type_id',
    label: 'Type',
    props: {
      sortable: 'true',
      padding: 'dense',
    }
  },
  {
    id: 'transport_name',
    label: 'Airline',
    props: {
      sortable: 'true',
      padding: 'dense',
    }
  },
  {
    id: 'Koli',
    label: 'Koli',
    data: (data) => `${data.min_koli}/${data.max_koli}`,
    props: {
      sortable: 'true',
      padding: 'dense',
    }
  },
  {
    id: 'Weight',
    label: 'Weight(kg)',
    data: (data) => `${data.min_weight}/${data.max_weight}`,
    props: {
      sortable: 'true',
      padding: 'dense',
    }
  },
  {
    id: 'transport_route',
    label: 'Vehicle #',
    props: {
      sortable: 'true',
      padding: 'dense',
    }
  },
  {
    id: 'destination',
    label: 'Destination',
    props: {
      sortable: 'true',
      padding: 'dense',
    }
  },
  {
    id: 'booking_transport_date',
    label: 'Date/Time',
    props: {
      sortable: 'true',
      padding: 'dense',
    }
  },
  {
    id: 'status',
    label: 'Booking Status',
    data: (data) => {
      return <Chip label={data.status ? 'USED' : 'UNUSED'}  />
    },
    props: {
      sortable: 'true',
      padding: 'dense',
    }
  },
  {
    id: 'edit',
    label: '',
    data: (data) => {
      return (
        <Button color="primary" component={Link} to={`${location.pathname}/edit/${data.transport_id}`}>
          Edit
        </Button>
      )
    },
    props: {
      padding: 'dense',
    }
  }
];
