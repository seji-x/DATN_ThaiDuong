'use client'

import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'

import { authEndpoint } from '@/config/endpoints'
import { LOGIN_SCHEMA } from '@/helper/schemas'
import { useMutation } from '@/hooks/useMutation'
import { Role } from '@/helper/enums'
import { IUser } from '@/types'
import { actionLogin } from '@/redux/slices/auth'
import PageTitle from '@/components/common/PageTitle'

export default function Login() {
  const loginMutation = useMutation<{ refresh: string; access: string; user: IUser }>()
  const dispatch = useDispatch()
  const router = useRouter()

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: LOGIN_SCHEMA,
    onSubmit: async (values) => {
      const { response, error } = await loginMutation.mutation({
        url: authEndpoint.LOGIN,
        body: values,
        method: 'post',
      })

      if (response) {
        dispatch(actionLogin(response))
        if ([Role.ADMIN, Role.TEACHER].includes(response.user.role)) router.push('/')
      } else {
        toast.error(error?.response?.data?.detail || 'Can not login')
      }
    },
  })

  return (
    <div>
      <PageTitle title="Login" />
      <form className="flex flex-col gap-3 mt-3" onSubmit={formik.handleSubmit}>
        <Input
          errorMessage={formik.errors.email}
          isInvalid={formik.touched.email && !!formik.errors.email}
          label="Email"
          name="email"
          variant="underlined"
          onChange={formik.handleChange}
        />
        <Input
          errorMessage={formik.errors.password}
          isInvalid={formik.touched.password && !!formik.errors.password}
          label="Password"
          name="password"
          variant="underlined"
          onChange={formik.handleChange}
        />
        <Button className="w-full mt-5" color="primary" isLoading={loginMutation.pending} size="lg" type="submit">
          Login
        </Button>
      </form>
    </div>
  )
}
